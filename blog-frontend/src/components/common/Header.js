import React from 'react';
import styled from 'styled-components';
import Responsive from "./Responsive";
import Button from "./Button";
import {Link} from "react-router-dom";

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    `;

//Responsive 컴포넌트에 스타일 추가해서 새로운 컴포넌트 생성
const Wrapper = styled(Responsive)`
    width: 95%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo{
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    }
    .right{
    display: flex;
    align-items: center;
    }
`;

//헤더가 fixed이기에 콘텐트 내려주는 컴포넌트
const Spacer = styled.div`
    height: 4rem;
    `;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const Header = ({user, onLogout}) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className={"logo"}>
                        blog
                    </Link>
                    {user ? (
                        <div className={"right"}>
                            <UserInfo>{user.username}</UserInfo>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </div>
                    ) : (
                        <div className={"right"}>
                            <Button to={"/login"}>로그인</Button>
                        </div>
                    )}
                </Wrapper>
            </HeaderBlock>
            <Spacer/>
        </>
    );
};

export default Header;