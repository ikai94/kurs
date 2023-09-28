import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducers } from 'entities/Profile';
import { loginReducers } from 'features/AuthByUsername/model/slice/loginSlice';
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducers } from 'entities/Article/model/slice/articleDetailsSlice';
import { addCommentFormReducers } from 'features/addCommentForm/model/slices/addCommentFormSlice';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';

const defaultAsuncReducers:ReducerList = {
    loginForm: loginReducers,
    profile: profileReducers,
    articleDetails: articleDetailsReducers,
    addCommentForm: addCommentFormReducers,
    articleDetailsComments: articleDetailsCommentsReducer,
};

// декоратор stor для reduxtoolkit
// здесь мы делаем механизм замыканий, которая из функции будет возвращать функцию, в данном случаи сам декоратор
// используем DeepPartial в качестве типа, для того чтоб извлекать только необходимые поля, а не все.
export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducerList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsuncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
