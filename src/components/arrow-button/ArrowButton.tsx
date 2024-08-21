import arrow from 'src/images/arrow.svg';
import React from 'react';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick?: OnClick;
	isOpenMenu?: boolean;
}

export const ArrowButton = (props: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${props.isOpenMenu ? styles.container_open : ""}`} 
			onClick={props.onClick}>
			<img src={arrow} alt='иконка стрелочки' className={`${styles.arrow} ${props.isOpenMenu ? styles.arrow_open : ""}`} />
		</div>
	);
};

