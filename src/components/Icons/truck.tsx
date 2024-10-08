import Icon from "@ant-design/icons";

const TruckSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            d="M19.8,5.4A1,1,0,0,0,19,5H15V4a2,2,0,0,0-2-2H3A2,2,0,0,0,1,4V17a1,1,0,0,0,1,1H3a4,4,0,0,0,8,0h2a4,4,0,0,0,8,0,2,2,0,0,0,2-2V10a1,1,0,0,0-.2-.6ZM7,20a2,2,0,1,1,2-2A2,2,0,0,1,7,20Zm6-4H10.444a3.965,3.965,0,0,0-6.888,0H3V10H13ZM13,6V8H3V4H13Zm4,14a2,2,0,1,1,2-2A2,2,0,0,1,17,20Zm4-4h-.556A3.936,3.936,0,0,0,15,14.556V7h3.5L21,10.333Z"
        />
    </svg>
);

export const TruckIcon = (props: React.ComponentProps<typeof Icon>) => (
    <Icon component={TruckSVG} {...props} />
);
