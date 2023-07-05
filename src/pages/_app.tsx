import 'antd/dist/reset.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ConfigProvider} from "antd";
import theme from "@/theme/theme";
import axios from "axios";
import UserProvider from "@/context/user/user-provider";
import dynamic from "next/dynamic";
import useUserContext from "@/context/user/use-user-context";
import React from "react";
import LoadingLayout from "@/layouts/loading-layout";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from 'dayjs/plugin/duration';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ru';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(localeData);

dayjs.locale('ru');
dayjs().localeData();

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_SERVER_URL;

const Switch = ({ Component, pageProps }: AppProps) => {
    const userContext = useUserContext();
    const { isLoading } = userContext;

    if (isLoading) {
        return (
            <LoadingLayout/>
        )
    }

    return (
        <Component {...pageProps} />
    )
}

function App(appProps: AppProps) {
  return (
      <ConfigProvider theme={theme}>
          <UserProvider>
              <Switch {...appProps} />
          </UserProvider>
      </ConfigProvider>
  )
}

export default dynamic(() => Promise.resolve(App), {
    ssr: false,
});

