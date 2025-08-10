// Formspree integration for contact forms
export interface FormspreeResponse {
  ok: boolean;
  errors?: Array<{
    field: string;
    code: string;
    message: string;
  }>;
}

export const formspreeAPI = {
  async submitForm(formId: string, data: Record<string, any>): Promise<FormspreeResponse> {
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      return {
        ok: response.ok,
        errors: result.errors || []
      };
    } catch (error) {
      console.error('Formspree error:', error);
      return {
        ok: false,
        errors: [{ field: 'general', code: 'network', message: 'Network error' }]
      };
    }
  }
};