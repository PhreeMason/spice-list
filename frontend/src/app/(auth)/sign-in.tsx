import { useState } from 'react';
import { View, Text, ScrollView, Alert, Image } from 'react-native';
import Button from '@/components/Button';
import { Link, Stack } from 'expo-router';

import { supabase } from '@/lib/supabase';
import FormField from '@/components/FormField';
import { logo } from '@/constants/images';

function SignIn() {
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const signInWithEmail = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword(form);
        if (error) {
            Alert.alert(error.message);
        }
        setLoading(false);
    };

    const onSubmit = () => {
        if (!form.email || !form.password) {
            setErrors('All fields are required');
            return;
        }
        setErrors('');
        signInWithEmail();
    };

    return (
        <ScrollView className="bg-primary h-full">
            <Stack.Screen options={{ headerShown: false }} />
            <View className="w-full min-h-[85vh] my-6 justify-center px-4">
                <Image
                    source={logo}
                    className="w-[115px] h-[35px]"
                    resizeMode="contain"
                />

                <Text className="text-2xl text-white text-semibold mt-10 font-spice-semibold">
                    Log In to Spice
                </Text>
                <Text className="text-red-500">{errors}</Text>

                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={text => setForm({ ...form, email: text })}
                    containerStyles="mt-7"
                    keyboardType="email-address"
                />

                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={text =>
                        setForm({ ...form, password: text })
                    }
                    containerStyles="mt-7"
                />

                <Button
                    title="Sign In"
                    handlePress={onSubmit}
                    containerStyles="mt-7"
                    isLoading={loading}
                />
                <View className="justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg font-spice-regular text-gray-100">
                        Don't have an account?
                    </Text>
                    <Link
                        href="./sign-up"
                        className="text-lg font-spice-semibold text-secondary"
                    >
                        Sign up
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}

export default SignIn;
