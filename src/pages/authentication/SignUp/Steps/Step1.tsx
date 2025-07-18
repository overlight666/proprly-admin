import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import FileUploader from "@/components/ui/filteupload";
import { signUpForm, OptionType } from "@/lib/interface";
import { FormikErrors } from "formik";
import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { countriesAtom } from "@/_recoil/states";

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}

type Step1Props = {
    errors: FormikErrors<signUpForm>;
    canNext: boolean;
    values: signUpForm;
    handleNext: () => void;
    handleChange: React.ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    >;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<signUpForm>> | Promise<void>;
};

export const Step1 = ({
    errors,
    canNext,
    values,
    handleChange,
    setFieldValue,
    handleNext
}: Step1Props) => {
    const countries = useRecoilValue(countriesAtom);
    const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
    const autocompleteRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const GOOGLE_API_KEY = "AIzaSyA-LdyXbcdt24Pbo4sVTN5bK2Oin_JABKo";

    useEffect(() => {
        if (countries) {
            const options = countries.map((country) => ({
                label: country.countryName,
                value: country.countryCode,
            }));
            setCountryOptions(options);
        }
    }, [countries]);

    useEffect(() => {
        // Load Google Maps API
        const loadGoogleMapsAPI = () => {
            if (window.google && window.google.maps) {
                setIsGoogleLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                setIsGoogleLoaded(true);
            };
            document.head.appendChild(script);
        };

        loadGoogleMapsAPI();
    }, []);

    useEffect(() => {
        if (isGoogleLoaded && inputRef.current && !autocompleteRef.current) {
            // Initialize Places Autocomplete
            autocompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                {
                    types: ['address'],
                    fields: ['formatted_address', 'address_components', 'geometry']
                }
            );

            // Add place selection listener
            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current.getPlace();
                if (place && place.formatted_address) {
                    setFieldValue('address', place.formatted_address);

                    // Extract additional address components if needed
                    if (place.address_components) {
                        const components = place.address_components;

                        // You can extract specific components like building number
                        const streetNumber = components.find((comp: any) => 
                            comp.types.includes('street_number')
                        );

                        if (streetNumber && streetNumber.long_name) {
                            setFieldValue('buildingNumber', streetNumber.long_name);
                        }

                        // Extract country
                        const country = components.find((comp: any) => 
                            comp.types.includes('country')
                        );

                        if (country && country.short_name) {
                            setFieldValue('organizationCountryCode', country.short_name);
                        }
                    }
                }
            });
        }
    }, [isGoogleLoaded, setFieldValue]);

    const userTypeOptions = [
        { label: "Builder", value: "Builder" },
        { label: "Developer", value: "Developer" },
        { label: "Contractor", value: "Contractor" },
        { label: "Consultant", value: "Consultant" }
    ];

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    };

    return (
        <div className="w-full min-w-[500px]">
            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-gray-200">
                    Let's get started
                </h1>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                    Fill in your basic details
                </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {/* User Type */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        User Type<span className="text-red-500">*</span>
                    </label>
                    <Select
                        options={userTypeOptions}
                        placeholder="Please Select"
                        value={values.userRole}
                        onChange={(value) => setFieldValue("userRole", value)}
                        className="w-full"
                        error={errors.userRole}
                        hint={errors.userRole}
                    />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Company Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={values.organizationName}
                        name="organizationName"
                        className="w-full"
                        placeholder="Enter company name"
                        onChange={handleChange}
                        error={errors.organizationName}
                        hint={errors.organizationName}
                    />
                </div>

                {/* Unique ID */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Unique ID<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={values.organizationUniqueCode}
                        name="organizationUniqueCode"
                        className="w-full"
                        placeholder="Enter ID"
                        onChange={handleChange}
                        error={errors.organizationUniqueCode}
                        hint={errors.organizationUniqueCode}
                    />
                </div>

                {/* Company Logo */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Company Logo<span className="text-red-500">*</span>
                    </label>
                    <div className="h-32">
                        <FileUploader
                            isDrop={true}
                            updateImageId={(imageId: string) => {
                                setFieldValue("companyImageId", imageId);
                            }}
                            setIsSignature={() => {}}
                        />
                    </div>
                    {errors.companyLogo && (
                        <p className="text-sm text-red-500">{errors.companyLogo}</p>
                    )}
                </div>

                {/* Country */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Country<span className="text-red-500">*</span>
                    </label>
                    <Select
                        options={countryOptions}
                        placeholder="Please Select"
                        value={values.organizationCountryCode}
                        onChange={(value) => setFieldValue("organizationCountryCode", value)}
                        className="w-full"
                        error={errors.organizationCountryCode}
                        hint={errors.organizationCountryCode}
                    />
                </div>

                {/* Address with Google Places Autocomplete */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Address<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            ref={inputRef}
                            value={values.address}
                            name="address"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search for address..."
                            onChange={handleAddressChange}
                        />
                        {!isGoogleLoaded && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            </div>
                        )}
                    </div>
                    {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                    )}
                </div>

                {/* Building No./Block No. */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Building No./Block No.
                    </label>
                    <Input
                        value={values.buildingNumber}
                        name="buildingNumber"
                        className="w-full"
                        placeholder="Enter building No/Floor No"
                        onChange={handleChange}
                    />
                </div>

                {/* Next Button */}
                <Button
                    disabled={canNext}
                    onClick={handleNext}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mt-6"
                >
                    Next
                </Button>

                {/* Login Link */}
                <div className="text-center text-sm mt-4">
                    <span className="text-gray-600 dark:text-gray-400">
                        Already registered?{" "}
                    </span>
                    <a href="/sign-in" className="text-blue-600 font-medium hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Click here to Log In
                    </a>
                </div>
            </div>
        </div>
    );
};