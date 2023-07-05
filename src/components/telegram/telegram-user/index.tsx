import React, {useEffect, useState} from "react";
import {Button, Card} from "antd";
import {AxiosError} from "axios";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PhoneForm from "@/components/telegram/telegram-user/phone-form";
import CodeForm from "@/components/telegram/telegram-user/code-form";
import UserCard from "@/components/telegram/telegram-user/user-card";

export interface TelegramUserProps {
    userId: string,
    userData: Partial<TelegramUser> | AxiosError | any,
    mutate: () => void
}

type LoginStages = 'loading' | 'loggedin' | 'shouldlogin' | 'codesended'

const TelegramUser = ({userId, userData, mutate}: TelegramUserProps) => {
    const [stage, setStage] = useState<LoginStages>('loading');
    const [tgUser, setTgUser] = useState<any>(null);
    const [ sendCodeResult, setSendCodeResult ] = useState<ResultMessage | undefined>(undefined);
    const [ signInResult, setSignInResult] = useState<ResultMessage | undefined>(undefined);

    useEffect(() => {
        console.log('userData', userData);
        setSendCodeResult(undefined);
        setSignInResult(undefined);
        if (!userData) {
            setStage('loading');
            setTgUser(null);
        } else if (userData?.message === "AUTH_KEY_UNREGISTERED"){
            setStage('shouldlogin');
            setTgUser(null);
        } else if (userData?.id){
            setStage('loggedin');
            setTgUser(userData);
        }
    }, [userData]);

    const handleSendCodeResult = (result:  ResultMessage | undefined) => {
        if (result?.type === 'success'){
            setStage('codesended');
        } else {
            setSendCodeResult(result);
        }
    }

    const handleSignInResultResult = (result:  ResultMessage | undefined) => {
        if (result?.type === 'success'){
            setStage('loggedin');
            mutate();
        } else {
            setSignInResult(result);
        }
    }

    const handleLogoutDone = () => {
        setStage('shouldlogin');
        setTgUser(null);
        mutate();
    }

    return (
        <Card title={'Пользователь Телеграм'}
              extra={<Button onClick={mutate}><FontAwesomeIcon icon={faArrowsRotate}/></Button>}
              style={{marginBottom: 24}}>
            {
                (stage === 'shouldlogin' || stage === 'codesended') &&
                <PhoneForm result={sendCodeResult}
                           setResult={handleSendCodeResult}
                           userId={userId}
                           readOnly={stage === 'codesended'}
                />
            }
            {
                stage === 'codesended' &&
                <CodeForm result={signInResult}
                          setResult={handleSignInResultResult}
                          userId={userId}
                          onCancel={() => setStage('shouldlogin' )}
                />
            }
            {
                stage === 'loggedin' && !!tgUser &&
                <UserCard userData={tgUser}
                          userId={userId}
                          onLogoutDone={handleLogoutDone} />
            }
        </Card>
    )
}

export default TelegramUser;
