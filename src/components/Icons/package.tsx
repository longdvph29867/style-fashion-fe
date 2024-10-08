import Icon from "@ant-design/icons";

const PackageSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        fill="#000000"
        height="14px"
        width="14px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 485.32 485.32"
        {...props}  // spread props to pass down any additional props
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g>
                <path d="m480.76,79.05c-0.6-0.2-235-78.3-235-78.3-2.1-1-4.1-1-6.2,0l-231.9,76.3c-5.8,2.4-7.2,7.4-7.2,10.3v313.3c0,5.2 3.1,9.3 7.2,10.3l229,73.2c3.5,1.3 7.3,1.8 12.1,0l228.9-73.2c4.1-2.1 7.2-6.2 7.2-10.3v-313.3c5.68434e-14-3.1-1-6.2-4.1-8.3zm-238.1-56.7l198.9,63.9-75.1,24.1-196-64.5 72.2-23.5zm-10.3,438l-211.3-67v-291.4l211.3,67.6v290.8zm10.3-310.2l-198.9-62.8 93.7-30.6 195.3,64.5-90.1,28.9zm10.3,310.2v-291.6l105.1-33.3v32.3l20.6-8.8v-30l85.5-27v290.4h0.1l-211.3,68z"></path>
            </g>
        </g>
    </svg>
);

export const PackageIcon = (props: React.ComponentProps<typeof Icon>) => (
    <Icon component={PackageSVG} {...props} />
);
