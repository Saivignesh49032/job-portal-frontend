import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ApplicationForm from '../ApplicationForm.jsx';

// Helper to create a fake file
function createFile(content, name, type) {
  const file = new File([content], name, { type });
  return file;
}

describe('ApplicationForm', () => {
  beforeEach(() => {
    // Stub the endpoint (without trailing slash to verify normalization)
    vi.stubEnv('VITE_CANDIDATES_ENDPOINT', 'http://example.test/api/candidates');
    // Mock fetch
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      text: async () => '',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('submits the form and calls fetch with FormData and normalized endpoint', async () => {
    render(<ApplicationForm jobTitle="Test Role" />);

    // Fill required fields
    await userEvent.type(screen.getByLabelText(/Candidate Name/i), 'John Doe1');
    await userEvent.type(screen.getByLabelText(/Address/i), '123 Example Street');
    await userEvent.type(screen.getByLabelText(/GitHub Link/i), 'https://github.com/johndoe');
    await userEvent.type(screen.getByLabelText(/^Age/i), '25');
    await userEvent.type(screen.getByPlaceholderText(/College\/University Name/i), 'ABC University');
    await userEvent.type(screen.getByPlaceholderText(/Passing Year/i), '2021');
    await userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com');
    // Provide a valid 10-digit numeric phone to satisfy validation
    await userEvent.type(screen.getByLabelText(/Phone Number/i), '9874512556');

    // Add a skill
    const skillInput = screen.getByPlaceholderText(/Type a skill and press Enter/i);
    await userEvent.type(skillInput, 'Django');
    await userEvent.click(screen.getByRole('button', { name: /add skill/i }));

    // Upload resume
    const file = createFile('PDF content', 'resume.pdf', 'application/pdf');
    const fileInput = screen.getByLabelText(/Choose PDF or DOC file/i, { selector: 'input[type="file"]' });
    await userEvent.upload(fileInput, file);

    // Submit
    await userEvent.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    const [calledUrl, options] = global.fetch.mock.calls[0];

    // Expect normalized trailing slash
    expect(calledUrl).toBe('http://example.test/api/candidates/');
    expect(options).toMatchObject({ method: 'POST' });
    expect(options.body).toBeInstanceOf(FormData);

    // Verify FormData content contains mapped keys
    const entries = Array.from(options.body.entries());
    const asObject = Object.fromEntries(entries.map(([k, v]) => [k, v instanceof File ? v.name : v]));

    expect(asObject).toMatchObject({
      name: 'John Doe1',
      address: '123 Example Street',
      github_link: 'https://github.com/johndoe',
      age: '25',
      college_name: 'ABC University',
      passing_year: '2021',
      email: 'john@example.com',
      phone_number: '9874512556',
      skills: 'Django',
      resume: 'resume.pdf',
    });
  });
});
