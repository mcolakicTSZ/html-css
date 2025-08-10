/*
  # Add email column to consultations table

  1. Changes
    - Add `email` column to `consultations` table
    - Set email as required field (NOT NULL)
    - Add default empty string for existing records

  2. Security
    - No changes to existing RLS policies
    - Email field will be subject to same security rules
*/

-- Add email column to consultations table
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '';

-- Update the default to NULL after adding the column (for new records)
ALTER TABLE consultations 
ALTER COLUMN email DROP DEFAULT;