import '../static/NavigationBar.css';
import Logo from './Logo';

export default function NavigationBar() {
  return (
    <>
      <div className="topnav">
        <a href="#">
          <span className='tube' style={{ fontSize: '24px' }}>
            Tube
          </span>
          <span className='hunter' style={{ fontSize: '22px',color:'white' }}>
            Hunter
          </span>
        </a>
        <a href="mailto:shobhankumar.20ads@sonatech.ac.in" className="split">
          Feedback
        </a>
      </div>
    </>
  );
}