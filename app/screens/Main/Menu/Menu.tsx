import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';

import styles from './style';

import Display from '@app/components/Display';
import MenuItems from './MenuItems';
import { AppState } from '@app/state/state';
import HamburgerItem from './HamburgerItem';
import { Profile, AuthSagaActions } from '@app/state/auth/types';

export interface MenuProps {
    logOut: () => void;
    userData: Profile;
};

export interface MenuState {
    menuItemsVisible: boolean;
};

class Menu extends PureComponent<MenuProps, MenuState> {
    public state: MenuState;

    constructor(props: MenuProps) {
        super(props);

        this.state = {
            menuItemsVisible: false
        };
    }

    private toggleMenuVisibility = () => {
        this.setState(prevState => ({ menuItemsVisible: !prevState.menuItemsVisible }));
    }

    public render() {
        const {
            logOut,
            userData,
        } = this.props;
        const {
            menuItemsVisible
        } = this.state;

        return (
            <Fragment>
                <Display style={styles.viewContainer} enable={menuItemsVisible} enter={'fadeInDownBig'} exit={'fadeOutUpBig'} defaultDuration={300}>
                    <MenuItems logOut={logOut} userData={userData} />
                </Display>
                <HamburgerItem onHamburgerClick={this.toggleMenuVisibility} />
            </Fragment>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: AuthSagaActions.LOGOUT })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

