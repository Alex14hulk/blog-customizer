import { useState, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArticleStateType, OptionType, backgroundColors, contentWidthArr, defaultArticleState,
		 fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	applyArticleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ( {applyArticleState}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const onClickIsOpenMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	}

	useOutsideClickClose({
		isOpenMenu,
		rootRef,
		onClose: () => setIsOpenMenu(false),
		onChange: setIsOpenMenu,
	});

	const [formState, setFormState] = useState<ArticleStateType>(() => {
		const newFormState = localStorage.getItem('formState');
		return newFormState ? JSON.parse(newFormState) : defaultArticleState;
	});

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		applyArticleState(formState);
		setIsOpenMenu(false);
	}

	const changeFormSubmit = (key: keyof ArticleStateType, option: OptionType) => {
		setFormState((prevState: ArticleStateType) => ({
			...prevState,
			[key]: option,
		})); 
	};

	const resetFormSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		setFormState(defaultArticleState);
		applyArticleState(defaultArticleState);
	}

	return (
		<>
			<ArrowButton onClick={onClickIsOpenMenu} isOpenMenu={isOpenMenu}/>
			<aside className={clsx(styles.container, {[styles.container_open]: isOpenMenu })} ref={rootRef}>
				<form className={styles.form} onSubmit={handleFormSubmit} onReset={resetFormSubmit}>
					<Text as={'h2'} uppercase={true} weight={800} size={31}>
						Задайте параметры</Text>
					<Select selected={formState.fontFamilyOption} options={fontFamilyOptions} 
							onChange={(option) => changeFormSubmit('fontFamilyOption', option)} 
							title="Шрифт">
					</Select>
					<RadioGroup selected={formState.fontSizeOption} options={fontSizeOptions} 
								onChange={(option) => changeFormSubmit('fontSizeOption', option)}
								title='Размер шрифта' name="Размер шрифта">
					</RadioGroup>
					<Select selected={formState.fontColor} options={fontColors} 
							onChange={(option) => changeFormSubmit('fontColor', option)}
							title="Цвет шрифта">
					</Select>
					<Separator/>
					<Select selected={formState.backgroundColor} options={backgroundColors} 
							onChange={(option) => changeFormSubmit('backgroundColor', option)}
							title="Цвет фона">
					</Select>
					<Select selected={formState.contentWidth} options={contentWidthArr} 
							onChange={(option) => changeFormSubmit('contentWidth', option)}
							title="Ширина контента">
					</Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
