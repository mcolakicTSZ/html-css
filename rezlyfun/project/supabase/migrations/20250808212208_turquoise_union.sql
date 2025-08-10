/*
  # Create consultations booking system

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `phone` (text, required)
      - `description` (text, required)
      - `consultation_date` (date, required)
      - `consultation_time` (text, required)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `consultations` table
    - Add policy for public insert (anyone can book)
    - Add policy for authenticated users to read all consultations (admin access)
    - Add policy for authenticated users to update consultations (admin access)

  3. Functions
    - Trigger to update `updated_at` timestamp automatically
*/

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  description text NOT NULL,
  consultation_date date NOT NULL,
  consultation_time text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Policy for public insert (anyone can book a consultation)
CREATE POLICY "Anyone can book consultations"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for authenticated users to read all consultations (admin access)
CREATE POLICY "Authenticated users can read all consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to update consultations (admin access)
CREATE POLICY "Authenticated users can update consultations"
  ON consultations
  FOR UPDATE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();