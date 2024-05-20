const BackgroundSection2 = () => {
    return (
        <>
            <div className="relative py-24 lg:py-32">
                <div className="nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100/70 dark:bg-black/20"></div>
                <div>
                    <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold">
                                The latest news<span>.</span>
                                <span className="text-neutral-500 dark:text-neutral-400">From the Ciseco blog</span>
                            </h2>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                        <div>
                            <div className="nc-Card12 group relative flex flex-col h-full"><img src="src/assets/img/pexels-photo-6168061.webp" alt="title"
                                loading="lazy"
                                  decoding="async"
                                data-nimg="fill"
                                className="object-cover w-full h-full"
                                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            /></div>
                        </div>
                        <div>j</div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default BackgroundSection2;