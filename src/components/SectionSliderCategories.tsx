const SectionSliderCategories = () => {
    return (
        <>
            <div className="nc-SectionSliderCategories mt-24">
                <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold">Shop by department</h2>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-7">
                    <div>
                        <div className="rounded-2xl bg-indigo-100"><img width="398" height="434" className="object-cover rounded-2xl" sizes="400px" src="src/assets/img/department1.webp" alt="" /></div>
                        <div className="mt-5 flex-1 text-center">
                            <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold">Travel Kits</h2>
                            <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">20+ categories</span>
                        </div>

                    </div>

                    <div>
                        <div className="rounded-2xl bg-indigo-100"><img width="398" height="434" className="object-cover rounded-2xl" sizes="400px" src="src/assets/img/department2.webp" alt="" /></div>
                        <div className="mt-5 flex-1 text-center">
                            <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold">Travel Kits</h2>
                            <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">20+ categories</span>
                        </div>

                    </div>

                    <div>
                        <div className="rounded-2xl bg-indigo-100"><img width="398" height="434" className="object-cover rounded-2xl" sizes="400px" src="src/assets/img/department3.webp" alt="" /></div>
                        <div className="mt-5 flex-1 text-center">
                            <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold">Travel Kits</h2>
                            <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">20+ categories</span>
                        </div>

                    </div>

                    <div>
                        <div className="rounded-2xl bg-indigo-100"><img width="398" height="434" className="object-cover rounded-2xl" sizes="400px" src="src/assets/img/department4.webp" alt="" /></div>
                        <div className="mt-5 flex-1 text-center">
                            <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold">Travel Kits</h2>
                            <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">20+ categories</span>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default SectionSliderCategories;