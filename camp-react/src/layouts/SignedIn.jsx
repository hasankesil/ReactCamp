// SignedIn.jsx
import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';

export default function SignedIn({ signOut, user }) {
    return (
        <Menu.Item>
            {user && (
                <>
                    <Image
                        avatar
                        spaced="right"
                        src="https://avatars.githubusercontent.com/u/118971537?s=96&v=4"
                    />
                    <Dropdown pointing="top left" text={`${user.username}`}>
                        <Dropdown.Menu>
                            <Dropdown.Item text="Bilgilerim" icon="info" />
                            <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out" />
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )}
        </Menu.Item>
    );
}
