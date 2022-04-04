import React, {useState} from 'react'
import logo from '../../../static/images/logo5.png'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';



const Navbar = (props) => {

    // propTypes = {
    //     auth: PropTypes.object.isRequired
    // }
    
    const [nav, setNav] = useState(false)
    const [showMenu, setShowMenu] = useState(true)

    const changeBackround = () => {
        if(window.scrollY >= 50) {
            setNav(true)
        }
        else{
            setNav(false)
        }
    }

    const resizeWindow = () => {
        if(window.innerWidth >= 600){
            setShowMenu(true)
        }
        if(window.innerWidth < 480){
            setShowMenu(false)
        }
    }

    window.addEventListener('scroll', changeBackround)
    window.addEventListener('resize', resizeWindow)


    const { isAuthenticated, user } = useSelector(state => state.auth)
    // const dispatch = useDispatch();





    return (
        <nav className={nav ? 'nav active' : 'nav'}>
            <Link to='/' className='logo'>
                <img src={logo} alt=''/>
            </Link>
            {/* <input type='checkbox' className='menu-btn' id='menu-btn'/> */}
            <label className='menu-icon' onClick={(e) => setShowMenu(!showMenu)}>
                <span className='nav-icon'></span>
            </label>
            <ul className='menu'>
                {showMenu ? 
                    <>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/tool'>Tool</Link></li>
                    {/* <li><Link to='/docs'>Docs</Link></li> */}
                    {isAuthenticated ? 
                        <>
                            <li><Link to='/dashboard'>Dashboard</Link></li>
                            <li><a onClick={props.logout} >Logout</a></li>
                        </>
                        :
                        <li><Link to='/register'>SignUp</Link></li>
                    }
                    </>
                    :
                    <></>
                }
                
            </ul>
        </nav>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})



export default connect(mapStateToProps, { logout })(Navbar)
