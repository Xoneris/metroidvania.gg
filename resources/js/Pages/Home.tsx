import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Layout from '@/Layouts/Layout';

export default function Home({ auth }: PageProps) {
    return (
        <>
            <Head title="Home" />

            <Layout>
                <div className="bg-[#111111]">
                    Banner
                </div>
                
                <div>
                    <h1>Coming Soon</h1>
                    <hr/>
                    <div>
                        Thumbnail Carousel
                    </div>
                </div>
                
            </Layout>


        </>
    );
}
