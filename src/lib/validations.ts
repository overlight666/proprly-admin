import * as yup from 'yup';

export const signUpValidattion = yup.object({
    fullName: yup
        .string()
        .required('Name is required')
        .max(255, 'Name is too Long!'),
    email: yup
        .string()
        .required('Email is required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
    password: yup.string()
        .required('password is required'),
    mobileNumber: yup
        .string()
        .required('mobile is required'),
    organizationName: yup
        .string()
        .required('Organization is required'),
    organizationCountryCode: yup
        .string()
        .required('Country code is required'),
    organizationTimezone: yup
        .string()
        .required('Timezone is required'),
});

export const forgotValidattion = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
});

export const itpTemplateValidattion = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .max(255, 'Name is too Long!'),
    tradeCodes: yup.array()
        .required('Trade code is required'),
    locations: yup.array()
        .required('Location is required'),
    isDefault: yup.boolean().optional()

});

export const itpTaskValidattion = yup.object({
    itpTemplateId: yup
        .number()
        .required('ITP Template not selected'),
    methodId: yup.number()
        .required('Method is required'),
    timingFrequencyId: yup.number()
        .required('Timing/Frequency is required'),
    inspectionWorkActivity: yup.string()
        .required('Inspection Work Activity is required'),
    verificationTypeId: yup.number()
        .required('Verification Type is required'),
    acceptanceCriteria: yup.string()
        .required('Acceptance Criteria is required'),

});

export const signinValidattion = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
    password: yup.string()
        .required('password is required'),
});

export const organizationValidation = yup.object({
    name: yup
        .string()
        .required('Organization name is required'),
    currency: yup.string()
        .required("Currency is required"),
    dateFormat: yup.string()
        .optional(),
    imageId: yup.string()
        .optional(),
    regionId: yup.number()
        .optional(),
    timezoneId: yup.number()
        .required("Timezone is required"),
    users: yup.array()
        .optional(),
});

export const projectValidation = yup.object({
    type: yup.string().required("Type is required"),
    name: yup.string().required("Organization name is required"),
    maintenanceServiceType: yup.string().required("Service type is required"),
    address: yup.string().required("Address is required"),
    address0: yup.string().required("Address is required"),
    address1: yup.string().optional(),
    address2: yup.string().optional(),
    imageId: yup.string().optional(),
    documents: yup.array().optional(),
    numBasementLevels: yup.string().optional(),
    towers: yup.array().optional(),
    organizationId: yup.string().optional(),
});
