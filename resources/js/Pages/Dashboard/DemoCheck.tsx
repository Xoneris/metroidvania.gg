import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function DemoCheck({logs}:{logs:string[]}) {

    return (
        <DashboardLayout>
            
            <Head title="Demo check"/>

            <h1 className="text-3xl">Demo Update Logs</h1>

            <div className="flex flex-col">
                {
                    logs.map((log) => (
                        <p>{log}</p>
                    ))
                }
            </div>
            
        </DashboardLayout>
    );
}
