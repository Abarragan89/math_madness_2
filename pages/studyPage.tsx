import { useRef, useLayoutEffect, useEffect } from 'react';
import styles from '../styles/studyPage/studyPage.module.css';
import Alien from '../assets/alienClass';
import Spaceship from '../assets/spaceship';



function StudyPage() {
    const size = { width: 370, height: 500 };

    const canvasRef = useRef(null);
    // reference to the animation reference to stop animation
    const requestIdRef = useRef(null);

    const spaceship = useRef(null);

    const alien1 = useRef(null);
    const alien2 = useRef(null);
    const alien3 = useRef(null);
    const alien4 = useRef(null);



    // Set up canvas
    // const canvas = canvasRef.current
    // const context = canvas.getContext('2d')
    // Set up image
    // const spaceship = new Image();
    // spaceship.src = '/rocketShip.png';
    // // Put properties of image in object
    // const spaceshipPos = {
    //     x: canvas.width / 2,
    //     y: 450,
    //     width: 170,
    //     height: 100
    // }
    // // animate function for image
    // function animate() {
    //     context.clearRect(0, 250, canvas.width, canvas.height);
    //     context.drawImage(spaceship, spaceshipPos.x, spaceshipPos.y, 170, 100); 
    //     spaceshipPos.x -= 4
    //     if (spaceshipPos.x > 250) requestAnimationFrame(animate)    
    //   }
    // spaceship.onload = animate



    const renderFrame = () => {
        spaceship.current.drawSpaceship();
        alien1.current.moveAlien();
        alien2.current.moveAlien();
        alien3.current.moveAlien();
        alien4.current.moveAlien();
    };

    const tick = () => {
        if (!canvasRef.current) return;
        canvasRef.current.getContext('2d').clearRect(0, 0, size.width, size.height / 2);

        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    };

    useLayoutEffect(() => {
        // set up image and canvas context
        const spaceshipImage = new Image();
        spaceshipImage.src = 'rocketShip.png';
        const ctx = canvasRef.current.getContext('2d');
        // canvasRef.current.style.position = 'absolute';

        // create instances of spaceship and aliens
        spaceship.current = new Spaceship(ctx, 200, 500, 170, 100, spaceshipImage)
        // spaceship.current.drawSpaceship();

        alien1.current = new Alien(ctx, 300, 20, 15, '56', 1, 1);
        alien2.current = new Alien(ctx, 120, 60, 15, '56', 1, 1);
        alien3.current = new Alien(ctx, 0, 100, 15, '56', 1, 1);
        alien4.current = new Alien(ctx, 200, 140, 15, '56', 1, 1);

        requestIdRef.current = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(requestIdRef.current);
        };
    }, []);

    // Listen for key events
    useEffect(() => {
        window.onkeydown = checkKey;
    }, [])

    // function to set up key presses
    function checkKey(e) {

        e = e || window.event;
        if (e.keyCode == '32') {
            spaceship.current.fireWeapon();
        }
        else if (e.keyCode == '40') {
        }
        else if (e.keyCode == '37') {
            spaceship.current.moveSpaceship('left')
        }
        else if (e.keyCode == '39') {
            spaceship.current.moveSpaceship('right')
        }
    }

    return (

        <main className={styles.mainStudyPage}>
            <div className='flex-box-sa'>
                <p>Score: 192</p>
                <div className="flex-box-sb">
                    <p>🚀</p>
                    <p>🚀</p>
                    <p>🚀</p>
                </div>
            </div>
            <p><span>num1</span> x <span>num2</span></p>
            <canvas width={370} height={500} ref={canvasRef} />
            {/* Controls */}
            <div>
                <p onClick={() => spaceship.current.moveSpaceship('left')}>&lt;</p>
                <p onClick={() => spaceship.current.moveSpaceship('right')}>&gt;</p>
            </div>
        </main>
    )
}

export default StudyPage;