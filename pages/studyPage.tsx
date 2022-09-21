import { useEffect, useRef } from 'react';
import frameRenderer from '../assets/frameRender';

import styles from '../styles/studyPage/studyPage.module.css';

function StudyPage() {
    const canvasRef = useRef(null)

    useEffect(() => {

        const size = { width: 370, height: 400 };
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        context.arc(50, 50, 10, 0, Math.PI * 2, false);
        context.fillStyle = 'green';
        context.fill();        

        context.arc(100,100, 20, 0, Math.PI * 2, false);
        context.fillStyle = 'red';
        context.fill();




        // const image = new Image();
        // image.src = "/rocketShip.png";
        // image.onload = () => {
        //     context.drawImage(image, 50, 50, 250, 150)
        // }
        frameRenderer.call(context, size);

    }, [])



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
            <canvas ref={canvasRef} />
        </main>
    )
}

export default StudyPage;