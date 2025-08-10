/*
  # Fix consultations table structure

  1. Table Updates
    - Ensure all required columns exist with proper types
    - Add missing email column if not exists
    - Set proper defaults and constraints

  2. Security
    - Ensure RLS is enabled
    - Update policies for anonymous booking and authenticated admin access

  3. Triggers
    - Ensure updated_at trigger exists
*/

-- Ensure the table has all required columns
DO $$
BEGIN
  -- Add email column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'consultations' AND column_name = 'email'
  ) THEN
    ALTER TABLE consultations ADD COLUMN email text NOT NULL DEFAULT '';
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Allow anonymous consultation booking" ON consultations;
DROP POLICY IF EXISTS "Authenticated users can read all consultations" ON consultations;
DROP POLICY IF EXISTS "Authenticated users can update consultations" ON consultations;

-- Create policies for anonymous booking
CREATE POLICY "Allow anonymous consultation booking"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Authenticated users can read all consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update consultations"
  ON consultations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure updated_at trigger function exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Ensure trigger exists
DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;
CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();