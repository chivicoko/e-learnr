<template>
    <nav className="fixed z-10 h-full md:min-h-screen flex flex-col justify-between items-center overflow-auto max-w-lg pb-8">
        <div className="flex flex-col justify-between items-center">
            <RouterLink to="/" class="py-6 md:py-8">
                <img src="/src/assets/logo.png" alt="e-learnr's logo" class="w-8 md:w-12 h-8 md:h-12">
            </RouterLink>
            
            <div className="tabs">
                <ul className="flex flex-col items-center w-full">
                    <RouterLink v-for="item in menuItems" :key="item.icon" :to="`${item.route}`">
                        <li :class="{'border-r-[#0f61ff] text-[#0f61ff] bg-[#f9f9f9] ': isActiveRoute(item.route), 'text-[#455454] border-transparent': !isActiveRoute(item.route) }" class="w-full py-2 md:p-4 px-3 md:px-8 text-xl border-r-2 border-transparent hover:border-r-[#0f5fff5c] hover:text-[#0f5fff5c] hover:bg-[#f9f9f96e] group transition-all duration-300 ease-linear">
                            <i :class="item.icon"></i>
                        </li>
                    </RouterLink>
                </ul>
            </div>
        </div>

        <div className="w-full py-2 md:p-4 px-3 md:px-8 text-xl text-[#455454] border-r-2 border-transparent hover:border-r-[#0f61ff] hover:text-[#0f61ff] hover:bg-[#f9f9f9] group">
            <i class="pi pi-cog text-sm md:text-xl "></i>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router';

    const route = useRoute();

    // Menu items
    const menuItems = [
        { icon: 'text-sm md:text-xl pi pi-th-large', route: '/' },
        { icon: 'text-sm md:text-xl pi pi-book', route: '/course-list' },
        { icon: 'text-sm md:text-xl pi pi-calendar', route: null },
        { icon: 'text-sm md:text-xl pi pi-users', route: null },
        { icon: 'text-sm md:text-xl pi pi-building-columns', route: null },
        { icon: 'text-sm md:text-xl pi pi-comments', route: null },
    ];

    // Check if the current route matches the provided route
    const isActiveRoute = (to: string | null) => {
        if (!to) return false;
        return to === '/' ? route.path === to : route.path.startsWith(to);
    };
</script>
