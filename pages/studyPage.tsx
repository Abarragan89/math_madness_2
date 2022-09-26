import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import styles from '../styles/studyPage/studyPage.module.css';
import Alien from '../assets/alienClass';
import Spaceship from '../assets/spaceship';
import Bullet from '../assets/bullets';
// import Bullet from '../assets/bullets';



function StudyPage() {
    const size = { width: 370, height: 600 };
    const canvasRef = useRef(null);
    const ctx = useRef(null)
    // reference to the animation reference to stop animation
    const requestIdRef = useRef(null);
    const spaceship = useRef(null);
    const bullets = useRef([]);

    const alien1 = useRef(null);
    const alien2 = useRef(null);
    const alien3 = useRef(null);
    const alien4 = useRef(null);


    const renderFrame = () => {
        spaceship.current.draw();
        if (bullets.current) {
            bullets.current.forEach((bullet) => {
                bullet.update();
            })
        }
        alien1.current.moveAlien();
        alien2.current.moveAlien();
        alien3.current.moveAlien();
        alien4.current.moveAlien();
    };

    const tick = () => {
        if (!canvasRef.current) return; 
        canvasRef.current.getContext('2d').clearRect(0, 0, size.width, size.height);
        renderFrame();
        requestIdRef.current = requestAnimationFrame(tick);
    };

    useLayoutEffect(() => {
        ctx.current = canvasRef.current.getContext('2d');
        // create instances of spaceship and aliens
        spaceship.current = new Spaceship(ctx.current)
        alien1.current = new Alien(ctx.current, 300, 20, 15, '56', 1, 1);
        alien2.current = new Alien(ctx.current, 120, 60, 15, '56', 1, 1);
        alien3.current = new Alien(ctx.current, 0, 100, 15, '56', 1, 1);
        alien4.current = new Alien(ctx.current, 200, 140, 15, '56', 1, 1);
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
            bullets.current.push(new Bullet(
                ctx.current, 
                spaceship.current.position.x + 85, 
                spaceship.current.position.y, 
                5))
        }
        else if (e.keyCode == '37') {
            spaceship.current.position.x -= 6;
        }
        else if (e.keyCode == '39') {
            spaceship.current.position.x += 6;
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
            <canvas width={370} height={600} ref={canvasRef} />
            {/* Controls */}
            <div>
                <p onClick={() => spaceship.current.moveSpaceship('left')}>&lt;</p>
                <p onClick={() => spaceship.current.moveSpaceship('right')}>&gt;</p>
            </div>
        </main>
    )
}

export default StudyPage;