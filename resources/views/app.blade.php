<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

        {{-- <meta name="description" content="Learn how to develop a tone of voice for your brand and use our template to get started."> --}}
        <meta name="description" content="The #1 Information hub for Metroidvania fans. Find the latest and greatest Metroidvanias!">
        <meta name="google-adsense-account" content="ca-pub-7981802089975633">

        <title inertia>{{ config('app.name', 'Metroidvania.GG') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Favicon -->
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.ico"/>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead

        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4F85GDK216"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4F85GDK216');
        </script>

        <!-- Google Adsense -->
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7981802089975633"
        crossorigin="anonymous"></script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>

</html>
