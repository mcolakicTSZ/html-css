/*
  # Fix RLS policy for consultations table

  1. Security Changes
    - Update INSERT policy to allow anonymous users to book consultations
    - Ensure anonymous users can create consultation records
    - Maintain security for other operations (SELECT, UPDATE, DELETE remain restricted)

  2. Policy Updates
    - Allow INSERT for anonymous (anon) role
    - Keep existing policies for authenticated users
*/

-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Allow anonymous consultation booking" ON consultations;

-- Create new INSERT policy that allows anonymous users to book consultations
CREATE POLICY "Allow anonymous consultation booking"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the existing SELECT policy for authenticated users is still there
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'consultations' 
    AND policyname = 'Authenticated users can read all consultations'
  ) THEN
    CREATE POLICY "Authenticated users can read all consultations"
      ON consultations
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Ensure the existing UPDATE policy for authenticated users is still there
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'consultations' 
    AND policyname = 'Authenticated users can update consultations'
  ) THEN
    CREATE POLICY "Authenticated users can update consultations"
      ON consultations
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;