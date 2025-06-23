import { ConfirmButton } from '@/components/Buttons/Confirm';
import SelectGradient from '@/components/Input/SelectGradient';
import MainLayout from '@/components/MainLayout';
import { useAuth } from "@/context/AuthContext";
import { showToast } from '@/utils/showToast';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Animated, Pressable, Text, View } from "react-native";
function Payment() {
    const { scaleFont } = useAuth();
    const { initGooglePay, isGooglePaySupported, presentGooglePay } = useStripe();
    const [enabled, setEnabled] = useState(true);
    const [waiting, setWaiting] = useState(false);
    const [period, setPeriod] = useState("")
    const translateX = useState(new Animated.Value(enabled ? 20 : 0))[0];
    const router = useRouter();
    const onSkip = () => {
        router.replace('/dashboard' as any);
    };

    useEffect(() => {
        initGooglePay({
            testEnv: true,
            merchantName: "Saylo",
            countryCode: "US",
            billingAddressConfig: {
                format: "FULL",
                isPhoneNumberRequired: true,
                isRequired: false,
            },
            existingPaymentMethodRequired: false,
        });
    }, []);

    const toggleSwitch = () => {
        const toValue = enabled ? 0 : 20;
        Animated.timing(translateX, {
            toValue,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setEnabled(!enabled);
    };
    const openStripeSheet = async () => {
        try {
            setWaiting(true);
            // const paymentMethod = await stripe.createPaymentMethod({
            //     paymentMethodType: 'Card',
            // });
            // if (paymentMethod.error) {
            //     throw paymentMethod.error;
            // }
            // Step 1: Get PaymentSheet params from your backend
            const response = await axios.get('/stripe/create-subscription-intent', {
                params: {
                    plan: period,       // "Yearly" or "Monthly"
                    trial: enabled,      // true/false
                    // payment_method: paymentMethod.paymentMethod.id
                }
            });

            const {
                clientSecret
            } = response.data;
            showToast("ok");

            const { error } = await presentGooglePay({
                clientSecret,
                currencyCode: "USD", // display only
            });
            if (error) {
                console.error("GPay error", error);
            } else {
                console.log("Subscription setup confirmed");
            }
            // Step 2: Init PaymentSheet
            // const { error: initError } = await initPaymentSheet({
            //     merchantDisplayName: "Saylo",
            //     paymentIntentClientSecret: clientSecret,
            //     googlePay: {
            //         merchantCountryCode: "US",
            //         currencyCode: "USD",
            //         testEnv: true,
            //     },
            //     style: 'alwaysDark', // or 'automatic'
            // });

            // if (initError) {
            //     showToast(`Init error: ${initError.message}`);
            //     return;
            // }

            // // Step 3: Present PaymentSheet
            // const { error: sheetError } = await presentPaymentSheet();

            // if (sheetError) {
            //     showToast(`Payment failed: ${sheetError.message}`);
            // } else {
            //     showToast("Subscription successful!");
            //     router.replace("/dashboard");
            // }

        } catch (e) {
            console.error(e);
            showToast("Something went wrong");
        } finally {
            setWaiting(false);
        }
    };

    return (
        <>

            <MainLayout showHeader={true} showFooter={false} showbar={false} paddingBottom={45} showSkip={true} onSkip={onSkip}>
                <View style={{
                    paddingHorizontal: scaleFont(16),
                    justifyContent: "space-between",
                    flexGrow: 1
                }}>
                    <View>
                        <Text style={{
                            fontFamily: "SFProSemiBold",
                            fontSize: scaleFont(36),
                            color: "#181818",
                            lineHeight: scaleFont(43.2),
                            marginTop: scaleFont(63)
                        }}>
                            Saylo helps couples stay in love with Integration AI
                        </Text>
                        <View style={{
                            marginTop: scaleFont(16)
                        }}>
                            <Text style={{
                                fontFamily: "SFPro",
                                fontSize: scaleFont(16),
                                color: "#5F5F5F",
                                lineHeight: scaleFont(19.2),
                            }}>
                                Choose your plan.
                            </Text>
                            <Text style={{
                                fontFamily: "SFProMedium",
                                fontSize: scaleFont(16),
                                color: "#181818",
                                lineHeight: scaleFont(19.2),
                            }}>
                                One subscription, two accounts.
                            </Text>
                        </View>
                        <View style={{
                            marginTop: scaleFont(32)
                        }}>
                            <View style={{
                                backgroundColor: "#FFFFFFB3",
                                borderRadius: scaleFont(16),
                                borderWidth: scaleFont(1),
                                borderColor: "#F8F8F8",
                                paddingHorizontal: scaleFont(8),
                                paddingVertical: scaleFont(12),
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: scaleFont(8)
                            }}>
                                <Text style={{
                                    fontFamily: "SFPro",
                                    fontSize: scaleFont(14),
                                    color: "#181818",
                                }}>
                                    Free trial enabled
                                </Text>
                                <Pressable onPress={toggleSwitch} style={{
                                    width: 51,
                                    height: 31,
                                    borderRadius: 20,
                                    backgroundColor: enabled ? '#00C853' : '#ccc',
                                    padding: 2,
                                }}>
                                    <Animated.View style={{
                                        width: 27,
                                        height: 27,
                                        borderRadius: 14,
                                        backgroundColor: '#fff',
                                        transform: [{ translateX }]
                                    }} />
                                </Pressable>
                            </View>
                            <SelectGradient showGradient={period === "Yearly"} style={{
                                marginTop: scaleFont(51),
                            }}>
                                <Pressable onPress={() => {
                                    setPeriod("Yearly")
                                }} style={{
                                    position: "relative",
                                    backgroundColor: period === "Yearly" ? "#FFFFFF" : "#FFFFFFB3",
                                    borderRadius: scaleFont(12),
                                    paddingVertical: scaleFont(12),
                                    paddingHorizontal: scaleFont(16),
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: scaleFont(8),
                                    zIndex: 100
                                }}>
                                    <LinearGradient
                                        colors={["#EBD2FE", "#FBB9DD"]}
                                        start={{ x: 0.2, y: 0 }}
                                        end={{ x: 0.5, y: 1 }}
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: scaleFont(-27),
                                            width: scaleFont(148),
                                            height: scaleFont(31),
                                            borderRadius: scaleFont(17),
                                            borderBottomRightRadius: scaleFont(0),
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                        <Text style={{
                                            fontFamily: "SFProSemiBold",
                                            fontSize: scaleFont(12),
                                            color: "#FFFFFF",
                                            lineHeight: scaleFont(19.2)
                                        }}>
                                            Most Popular
                                        </Text>
                                    </LinearGradient>
                                    <View>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: scaleFont(7)
                                        }}>
                                            <Text style={{
                                                fontFamily: "SFProSemiBold",
                                                fontSize: scaleFont(16),
                                                color: "#181818",
                                            }}>
                                                Yearly
                                            </Text>
                                            <LinearGradient
                                                colors={["#EBD2FE", "#FBB9DD"]}
                                                start={{ x: 0, y: 0.5 }}
                                                end={{ x: 1, y: 0.5 }}
                                                style={{
                                                    width: scaleFont(55),
                                                    height: scaleFont(18),
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: scaleFont(9)
                                                }}
                                            >
                                                <Text style={{
                                                    fontFamily: "SFPro",
                                                    fontSize: scaleFont(8),
                                                    color: "#FFFFFF",
                                                    lineHeight: scaleFont(12.8)
                                                }}>
                                                    Save 77%
                                                </Text>
                                            </LinearGradient>
                                        </View>
                                        <Text style={{
                                            fontFamily: "SFProMedium",
                                            fontSize: scaleFont(14),
                                            color: "#181818",
                                            lineHeight: scaleFont(14),
                                            marginTop: scaleFont(12)
                                        }}>
                                            12 mo - 39,99USD
                                        </Text>
                                    </View>
                                    <Text style={{
                                        fontFamily: "SFProMedium",
                                        fontSize: scaleFont(14),
                                        color: "#181818",
                                        lineHeight: scaleFont(14),
                                    }}>
                                        3,33 USD / mo
                                    </Text>
                                </Pressable>
                            </SelectGradient>
                            <SelectGradient showGradient={period === "Monthly"} style={{
                                marginTop: scaleFont(23)
                            }}>
                                <Pressable onPress={() => {
                                    setPeriod("Monthly")
                                }} style={{
                                    position: "relative",
                                    backgroundColor: period === "Monthly" ? "#FFFFFF" : "#FFFFFFB3",
                                    borderRadius: scaleFont(12),
                                    paddingVertical: scaleFont(22),
                                    paddingHorizontal: scaleFont(16),
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: scaleFont(8)
                                }}>
                                    <Text style={{
                                        fontFamily: "SFProSemiBold",
                                        fontSize: scaleFont(18),
                                        color: "#181818",
                                    }}>
                                        Monthly
                                    </Text>
                                    <Text style={{
                                        fontFamily: "SFProMedium",
                                        fontSize: scaleFont(14),
                                        color: "#181818",
                                        lineHeight: scaleFont(14),
                                    }}>
                                        14.99 USD / mo
                                    </Text>
                                </Pressable>
                            </SelectGradient>
                        </View>
                    </View>
                    <View style={{
                        marginTop: scaleFont(42)
                    }}>
                        <ConfirmButton
                            waiting={waiting}
                            title={enabled ? "Start your 7-day free trial" : "Next"}
                            onClick={() => {
                                if (period) openStripeSheet();
                                else showToast("Please select a plan");
                            }} />
                        <Text style={{
                            fontFamily: "SFProMedium",
                            fontSize: scaleFont(12),
                            color: "#5F5F5F",
                            lineHeight: scaleFont(14.4),
                            marginTop: scaleFont(10),
                            textAlign: "center"
                        }}>
                            No payment due today
                        </Text>
                    </View>
                </View>
            </MainLayout>
        </>
    );
}

export default function StripePaymentMethod() {
    return <StripeProvider
        publishableKey="pk_test_51RbGRp4e36SMDXjvMajGndVpjjctMgYXZF4WZfIcCa9ILKn5tM4UovaLdng5dZ4zOmGpYwjL4cwc0cANei40YH9g00j1O3Xmxw"
        merchantIdentifier="merchant.com.saylo"
    >
        <Payment />
    </StripeProvider>
} 