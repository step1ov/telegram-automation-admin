import {Menu, MenuProps} from "antd";
import React, {useState} from "react";
import {useRouter} from "next/router";

export interface TopMenuLayoutProps {
    items: MenuProps['items'],
    children: any
}

const TopMenuLayout = ({items, children} : TopMenuLayoutProps) => {

    const router = useRouter();
    const [current, setCurrent] = useState(router.pathname);

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        router.push(e.key);
    };

    return (
        <>
            <Menu onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={items}
                  style={{marginBottom: '16px'}} />
            {children}
        </>
    );
}

export default TopMenuLayout;
