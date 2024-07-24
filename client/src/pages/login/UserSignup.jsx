import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FormField from '../../components/FormField';
import SelectField from '../../components/SelectField';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    billingStreetAddress: yup.string().required('Billing Street Address is required'),
    billingZipcode: yup.string().required('Billing Zipcode is required'),
    billingCity: yup.string().required('Billing City is required'),
    billingState: yup.string().required('Billing State is required'),
    billingCountry: yup.string().required('Billing Country is required'),
    mailingStreetAddress: yup.string().required('Mailing Street Address is required'),
    mailingZipcode: yup.string().required('Mailing Zipcode is required'),
    mailingCity: yup.string().required('Mailing City is required'),
    mailingState: yup.string().required('Mailing State is required'),
    mailingCountry: yup.string().required('Mailing Country is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'), // Confirm password field added
    shopName: yup.string(),
});

const states = ["California", "New York", "Texas", "Florida", "Illinois"]; // Example states
const countries = ["United States", "Canada", "Mexico"]; // Example countries

const UserSignup = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', data); // Ensure the URL is correct
            localStorage.setItem('token', response.data.token);
            alert('Registration successful');
        } catch (error) {
            if (error.response) {
                alert('Registration failed: ' + error.response.data.message);
            } else {
                alert('Registration failed: ' + error.message);
            }
        }
    };

    const handleAddressCheck = () => {
        setValue('mailingStreetAddress', watch('billingStreetAddress'));
        setValue('mailingZipcode', watch('billingZipcode'));
        setValue('mailingCity', watch('billingCity'));
        setValue('mailingState', watch('billingState'));
        setValue('mailingCountry', watch('billingCountry'));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6 text-center">User Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField label="First Name" name="firstName" register={register} errors={errors} />
                <FormField label="Last Name" name="lastName" register={register} errors={errors} />
                <FormField label="Email" name="email" register={register} errors={errors} />
                
                <FormField label="Billing Street Address" name="billingStreetAddress" register={register} errors={errors} />
                <FormField label="Billing Zipcode" name="billingZipcode" register={register} errors={errors} />
                <FormField label="Billing City" name="billingCity" register={register} errors={errors} />
                <SelectField label="Billing State" name="billingState" register={register} errors={errors} options={states} />
                <SelectField label="Billing Country" name="billingCountry" register={register} errors={errors} options={countries} />
                
                <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" onClick={handleAddressCheck} />
                    <label className="ml-2 block text-sm text-gray-900">Mailing address same as billing</label>
                </div>
                
                <FormField label="Mailing Street Address" name="mailingStreetAddress" register={register} errors={errors} />
                <FormField label="Mailing Zipcode" name="mailingZipcode" register={register} errors={errors} />
                <FormField label="Mailing City" name="mailingCity" register={register} errors={errors} />
                <SelectField label="Mailing State" name="mailingState" register={register} errors={errors} options={states} />
                <SelectField label="Mailing Country" name="mailingCountry" register={register} errors={errors} options={countries} />
                
                <FormField label="Username" name="username" register={register} errors={errors} />
                <FormField label="Password" name="password" type="password" register={register} errors={errors} /> {/* Password field added */}
                <FormField label="Confirm Password" name="confirmPassword" type="password" register={register} errors={errors} /> {/* Confirm password field added */}
                <FormField label="Shop Name (Optional)" name="shopName" register={register} errors={errors} />
                
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Register</button>
                <p className="text-center text-sm text-gray-600 mt-4">Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link></p>
            </form>
        </div>
    );
};

export default UserSignup;

