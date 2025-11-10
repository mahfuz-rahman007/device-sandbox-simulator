import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#1e293b',
                            color: '#f1f5f9',
                            border: '1px solid #475569',
                        },
                        success: {
                            style: {
                                background: '#059669',
                                color: '#ecfdf5',
                            },
                        },
                        error: {
                            style: {
                                background: '#dc2626',
                                color: '#fee2e2',
                            },
                        },
                    }}
                />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
