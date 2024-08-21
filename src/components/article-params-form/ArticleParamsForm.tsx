import { useState, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState,
		 fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	applyArticleState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const onClickIsOpenMenu = () => {
		setIsOpenMenu(isOpenMenu === false ? true : false);
	}

	useOutsideClickClose({
		isOpenMenu,
		rootRef,
		onClose: () => setIsOpenMenu(false),
		onChange: setIsOpenMenu,
	});

	const [formState, setFormState] = useState({
		backgroundColor: props.articleState.backgroundColor,
		contentWidth: props.articleState.contentWidth,
		fontColor: props.articleState.fontColor,
		fontFamilyOption: props.articleState.fontFamilyOption,
		fontSizeOption: props.articleState.fontSizeOption,
	});

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		props.applyArticleState({
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
			fontColor: formState.fontColor,
			fontFamilyOption: formState.fontFamilyOption,
			fontSizeOption:formState.fontSizeOption,
		})
		setIsOpenMenu(false)
	}

	const resetFormSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
		event.preventDefault();
		setFormState(defaultArticleState)
		props.applyArticleState(defaultArticleState);
	}

	return (
		<>
			<ArrowButton onClick={onClickIsOpenMenu} isOpenMenu={isOpenMenu}/>
			<aside className={`${styles.container} ${isOpenMenu ? styles.container_open : ""}`} ref={rootRef}>
				<form className={styles.form} onSubmit={handleFormSubmit} onReset={resetFormSubmit}>
					<Text as={'h2'} uppercase={true} weight={800} size={31}>
						Задайте параметры</Text>
					<Select selected={formState.fontFamilyOption} options={fontFamilyOptions} 
							onChange={(selected) => { 
								setFormState((prevState) => ({ ...prevState, fontFamilyOption: selected})) }} 
							title="Шрифт">
					</Select>
					<RadioGroup selected={formState.fontSizeOption} options={fontSizeOptions} 
								onChange={(selected) => { 
									setFormState((prevState) => ({ ...prevState, fontSizeOption: selected})) }} 
								title='Размер шрифта' name="Размер шрифта">
					</RadioGroup>
					<Select selected={formState.fontColor} options={fontColors} 
							onChange={(selected) => { 
								setFormState((prevState) => ({ ...prevState, fontColor: selected})) }} 
							title="Цвет шрифта">
					</Select>
					<Separator/>
					<Select selected={formState.backgroundColor} options={backgroundColors} 
							onChange={(selected) => { 
								setFormState((prevState) => ({ ...prevState, backgroundColor: selected})) }} 
							title="Цвет фона">
					</Select>
					<Select selected={formState.contentWidth} options={contentWidthArr} 
							onChange={(selected) => { 
								setFormState((prevState) => ({ ...prevState, contentWidth: selected})) }} 
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
