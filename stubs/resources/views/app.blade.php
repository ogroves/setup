@php
    $config = [
        'title' => "",
        'description' => '',
        'image' => '',
        'twitter' => ''
    ];
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <base href="/"/>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>{{ $config['title'] }}</title>
        <meta name="author" content="Expedia">
        {{-- CDN Prefetch --}}
        <link rel="dns-prefetch" href="//cloud.papercrowns.com">
        <link rel="preconnect" href="https://cloud.papercrowns.com" crossorigin>
        {{-- Favicon --}}

        {{-- Google --}}
        <meta name="name" content="{{ $config['description'] }}"/>
        <meta name="description" content="{{ $config['description'] }}"/>
        <meta name="image" content="{{ $config['image'] }}">
        {{-- OpenGraph --}}
        <meta property="og:url" content="/"/>
        <meta property="og:locale" content="en_US"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="{{ $config['title'] }}"/>
        <meta property="og:site_name" content="Expedia.com"/>
        <meta property="og:description" content="{{ $config['description'] }}"/>
        <meta property="og:image" content="{{ $config['image'] }}"/>
        {{-- Twitter Meta Tags --}}
        <meta name="twitter:card" content="summary_large_image">
        @if($config['twitter'])<meta name="twitter:site" content="{{ $config['twitter'] }}">@endif
        <meta name="twitter:title" content="{{ $config['title'] }}">
        <meta name="twitter:description" content="{{ $config['description'] }}">
        <meta name="twitter:image" content="{{ $config['image'] }}">
        {{-- CSS --}}
        @vite('resources/css/app.css')
        {{-- Fathom --}}
        <script src="https://cdn.usefathom.com/script.js" data-spa="auto" data-site="" data-included-domains="" defer></script>
	</head>
	<body>
		<div id="__APP_NAME__">
			<router-view v-slot="{ Component }">
				<component :is="Component"/>
			</router-view>
		</div>
        @vite('resources/js/app.js')
	</body>
</html>
