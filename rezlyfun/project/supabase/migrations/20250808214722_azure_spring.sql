/*
  # Allow anonymous users to book consultations

  1. Security Changes
    - Drop existing restrictive INSERT policy
    - Create new policy allowing anonymous users to insert consultations
    - Maintain existing policies for authenticated users

  This enables the public booking form to work while keeping admin functions secure.
*/

-- Drop the existing INSERT policy that's blocking anonymous users
DROP POLICY IF EXISTS "Anyone can book consultations" ON consultations;

-- Create a new policy that explicitly allows anonymous users to insert
CREATE POLICY "Allow anonymous consultation booking"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the existing policies for authenticated users remain
-- (These should already exist but we'll recreate them to be safe)
DROP POLICY IF EXISTS "Authenticated users can read all consultations" ON consultations;
DROP POLICY IF EXISTS "Authenticated users can update consultations" ON consultations;

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