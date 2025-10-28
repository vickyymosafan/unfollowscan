import styles from './AnimatedStartButton.module.css';

export default function AnimatedStartButton() {
    return (
        <div className={styles.btnWrapper}>
            <a href="#upload" className={styles.btn}>
                <svg
                    className={styles.btnSvg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                </svg>
                <div className={styles.txtWrapper}>
                    <div className={styles.txt1}>
                        <span className={styles.btnLetter}>M</span>
                        <span className={styles.btnLetter}>u</span>
                        <span className={styles.btnLetter}>l</span>
                        <span className={styles.btnLetter}>a</span>
                        <span className={styles.btnLetter}>i</span>
                        <span className={styles.btnLetter}> </span>
                        <span className={styles.btnLetter}>S</span>
                        <span className={styles.btnLetter}>e</span>
                        <span className={styles.btnLetter}>k</span>
                        <span className={styles.btnLetter}>a</span>
                        <span className={styles.btnLetter}>r</span>
                        <span className={styles.btnLetter}>a</span>
                        <span className={styles.btnLetter}>n</span>
                        <span className={styles.btnLetter}>g</span>
                    </div>
                    <div className={styles.txt2}>
                        <span className={styles.btnLetter}>M</span>
                        <span className={styles.btnLetter}>e</span>
                        <span className={styles.btnLetter}>m</span>
                        <span className={styles.btnLetter}>p</span>
                        <span className={styles.btnLetter}>r</span>
                        <span className={styles.btnLetter}>o</span>
                        <span className={styles.btnLetter}>s</span>
                        <span className={styles.btnLetter}>e</span>
                        <span className={styles.btnLetter}>s</span>
                        <span className={styles.btnLetter}>.</span>
                        <span className={styles.btnLetter}>.</span>
                        <span className={styles.btnLetter}>.</span>
                    </div>
                </div>
            </a>
        </div>
    );
}
