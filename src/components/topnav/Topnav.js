import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ClusterBar from "../clusterBar/ClusterBar";
import {Logo} from "../../services/SvgService";
import Utils from "../../modules/Utils";

const sidenavItems = [
    {
        label: 'Dashboard',
        link: '/franz-manager/dashboard',
    },
    {
        label: 'Cluster',
        link: '/franz-manager/cluster',
    },
    {
        label: 'Topics',
        link: '/franz-manager/topics',
    },
    {
        label: 'Consumers',
        link: '/franz-manager/consumers',
    }
];

class Topnav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSidenavItem: '',
            subLocation: ''
        };

        this.props.history.listen(location => {
            this._updateRoute(location);
        });

    }

    componentDidMount() {
        this._updateRoute(this.props.location);
    }

    _updateRoute(location) {
        const splittedPath = location.pathname.split('/');
        let selectedSidenavItem = sidenavItems.find(m => m.link.split('/')[2] === location.pathname.split('/')[2]);
        this.setState({
            selectedSidenavItem: selectedSidenavItem ? selectedSidenavItem.label : sidenavItems[0].label,
            subLocation: splittedPath[3] || ''
        })
    }

    render() {
        return (
            <header className="top-header flex">
                <Link to="/franz-manager">
                    <div className="logo pointer">
                        <Logo/>
                    </div>
                </Link>

                <div className="breadcrumb flex-1">
                    <div>
                        <div className="flex margin-bottom-4px">
                            <span className="item">Cluster production</span>
                            {this.state.subLocation && <span className="item">{this.state.selectedSidenavItem}</span>}
                        </div>
                        <h1>{this.state.subLocation || this.state.selectedSidenavItem}</h1>
                    </div>
                </div>

                {this.state.selectedSidenavItem !== 'Dashboard' && <ClusterBar/>}
            </header>
        );
    }
}

export default withRouter(Topnav);