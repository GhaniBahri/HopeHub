import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import Banner from "@/components/HomePage/Banner";
import BlogsCarousel from "@/components/HomePage/BlogsCarousel";
import ConnectionSection from "@/components/HomePage/ConnectionSection";
import PurchasingSection from "@/components/HomePage/PurchasingSection";
import TherapistsInfoSection from "@/components/HomePage/TherapistsInfoSection";

import { useAppcontext } from "@/context/state";
import Layout from "@/layout/Layout";

export default function HomePage() {
    const { t } = useTranslation("common");
    const { user } = useAppcontext();
    console.log("logged user data", user);

    return (
        <Layout>
            <div className='flex flex-col items-center justify-start h-screen'>
                <Banner />
                <TherapistsInfoSection />
                <ConnectionSection />
                <BlogsCarousel />
                <PurchasingSection />
                <p>{t("test")}</p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                    }}
                >
                    <a
                        href='/en'
                        onClick={() => {
                            Cookies.set("userLanguage", "en", { expires: 365 });
                            window.location.reload();
                        }}
                    >
                        English
                    </a>
                    <a
                        href='/ar'
                        onClick={() => {
                            Cookies.set("userLanguage", "ar", { expires: 365 });
                            window.location.reload();
                        }}
                    >
                        العربية
                    </a>
                    <a
                        href='/fr'
                        onClick={() => {
                            Cookies.set("userLanguage", "fr", { expires: 365 });
                            window.location.reload();
                        }}
                    >
                        French
                    </a>
                </div>
                <h1>hope Hub</h1>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
