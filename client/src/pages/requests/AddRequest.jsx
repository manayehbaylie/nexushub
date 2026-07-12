import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRequest } from '../../services/requestService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AddRequest = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		request_number: '',
		title: '',
		description: '',
		priority: 'medium',
		status: 'pending',
		assigned_to: '',
		due_date: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setLoading(true);
		try {
			// prepare payload
			const payload = {
				request_number: form.request_number,
				title: form.title,
				description: form.description,
				priority: form.priority,
				status: form.status,
				assigned_to: form.assigned_to ? parseInt(form.assigned_to, 10) : null,
				due_date: form.due_date || null,
			};
			await createRequest(payload);
			navigate('/requests');
		} catch (err) {
			setError(err.message || 'Failed to create request');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-semibold'>Add Request</h1>
					<p className='mt-2 text-sm text-slate-600'>Create a new work request.</p>
				</div>
				<Button type='button' onClick={() => navigate('/requests')}>
					Back to requests
				</Button>
			</div>

			<form onSubmit={handleSubmit} className='grid gap-6 md:grid-cols-2'>
				<div className='space-y-2'>
					<label className='block text-sm font-medium text-slate-700'>Request Number</label>
					<Input name='request_number' value={form.request_number} onChange={handleChange} required />
				</div>

				<div className='space-y-2 md:col-span-2'>
					<label className='block text-sm font-medium text-slate-700'>Title</label>
					<Input name='title' value={form.title} onChange={handleChange} required />
				</div>

				<div className='space-y-2 md:col-span-2'>
					<label className='block text-sm font-medium text-slate-700'>Description</label>
					<textarea
						name='description'
						value={form.description}
						onChange={handleChange}
						className='w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-500'
						rows={4}
					/>
				</div>

				<div className='space-y-2'>
					<label className='block text-sm font-medium text-slate-700'>Priority</label>
					<select name='priority' value={form.priority} onChange={handleChange} className='w-full rounded-md border border-slate-300 px-3 py-2'>
						<option value='low'>Low</option>
						<option value='medium'>Medium</option>
						<option value='high'>High</option>
						<option value='urgent'>Urgent</option>
					</select>
				</div>

				<div className='space-y-2'>
					<label className='block text-sm font-medium text-slate-700'>Status</label>
					<select name='status' value={form.status} onChange={handleChange} className='w-full rounded-md border border-slate-300 px-3 py-2'>
						<option value='pending'>Pending</option>
						<option value='in_progress'>In Progress</option>
						<option value='completed'>Completed</option>
						<option value='cancelled'>Cancelled</option>
					</select>
				</div>

				<div className='space-y-2'>
					<label className='block text-sm font-medium text-slate-700'>Assigned To (member id)</label>
					<Input name='assigned_to' value={form.assigned_to} onChange={handleChange} placeholder='Member ID number' />
				</div>

				<div className='space-y-2'>
					<label className='block text-sm font-medium text-slate-700'>Due Date</label>
					<Input name='due_date' type='date' value={form.due_date} onChange={handleChange} />
				</div>

				<div className='md:col-span-2'>
					{error && <p className='mb-3 text-sm text-red-600'>{error}</p>}
					<Button type='submit' className='w-full' disabled={loading}>
						{loading ? 'Saving...' : 'Save request'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddRequest;
