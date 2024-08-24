import arrow from 'src/images/arrow.svg';
import React from 'react';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick: OnClick;
	isOpenMenu: boolean;
}

export const ArrowButton = (props: ArrowButtonProps): JSX.Element => {
	const {onClick, isOpenMenu} = props;

	const arrowButtonContainer = clsx(styles.container, {
		[styles.container_open]: isOpenMenu,
	});

	const arrowImagine = clsx(styles.arrow, {
		[styles.arrow_open]: isOpenMenu,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={arrowButtonContainer} 
			onClick={props.onClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowImagine} />
		</div>
	);
};

