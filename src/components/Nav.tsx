"use client";

import React, { useState } from "react";
import { UsergroupAddOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "Home",
    icon: <HomeOutlined />,
    label: <Link href="/">Home</Link>,
  },
  {
    label: <Link href="/users">Users</Link>,
    key: "users",
    icon: <UsergroupAddOutlined />,
  },
];

const NavBar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="xl:px-96 py-5">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default NavBar;
