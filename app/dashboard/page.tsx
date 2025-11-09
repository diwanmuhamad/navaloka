"use client"
import { RootState } from "@/store/store"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux"

export default function redirectDashboard() {
    const {user, loading, error} = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(()=>{
        if (error) return;

        if (!loading) {
            if (user) {
                const role = user?.user_metadata.role
                if (role) {
                    router.push(`/dashboard/${role}`);
                }
                else {
                    router.push("/onboarding")
                }
            }
            else {
                router.push('/')
            }
           
        }
    }, [loading, user, error])
    return <></>;
}