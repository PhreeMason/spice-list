import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';

import { logo } from '@/constants/images';
import FormField from '@/components/FormField';
import Button from '@/components/Button';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';

const SignUp = () => {
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: '',
        username: ''
    });

    const signUpWithEmail = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp(form);
        if (error) {
            Alert.alert(error.message);
        }
        setLoading(false);
    };

    const onSubmit = () => {
        if (!form.email || !form.password || !form.username) {
            setErrors('All fields are required');
            return;
        }
        setErrors('');
        signUpWithEmail();
        setForm({
            email: '',
            password: '',
            username: ''
        });
    };
    return (
        <ScrollView className="bg-primary h-full">
            <View className="w-full min-h-[85vh] my-6 justify-center px-4">
                <Image
                    source={logo}
                    className="w-[115px] h-[35px]"
                    resizeMode="contain"
                />

                <Text className="text-2xl text-white text-semibold mt-10 font-spice-semibold">
                    Sign Up to Spice
                </Text>
                <Text className="text-red-500">{errors}</Text>

                <FormField
                    title="Username"
                    value={form.username}
                    handleChangeText={(text) =>
                        setForm({ ...form, username: text })
                    }
                    containerStyles="mt-10"
                />
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(text) =>
                        setForm({ ...form, email: text })
                    }
                    containerStyles="mt-7"
                    keyboardType="email-address"
                />

                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(text) =>
                        setForm({ ...form, password: text })
                    }
                    containerStyles="mt-7"
                />

                <Button
                    title="Sign Up"
                    handlePress={onSubmit}
                    containerStyles={'mt-7'}
                    isLoading={loading}
                />
                <View className="justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg font-spice-regular text-gray-100">
                        Already have an account?
                    </Text>
                    <Link
                        href="./sign-in"
                        className="text-lg font-spice-semibold text-secondary"
                    >
                        Sign in
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;
