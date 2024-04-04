import CN from 'vgw/_shared/utils/classNames';
import styles from './styles.module.scss';

const GridOverlay = ({ visible }: { visible?: boolean }): JSX.Element => {
  return (
    <div className={CN(styles.container, visible && styles.visible)}>
      <div className={styles.row}>
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} />
        ))}
      </div>
    </div>
  );
};

export default GridOverlay;
