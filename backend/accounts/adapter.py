from allauth.account.adapter import DefaultAccountAdapter

class CustomUserAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """
        from allauth.account.utils import user_field

        user = super().save_user(request, user, form, False)
        user_field(user, 'username', request.data.get('username', ''))
        user_field(user, 'nickname', request.data.get('nickname', ''))
        user_field(user, 'password1', request.data.get('password1', ''))
        user_field(user, 'password2', request.data.get('password2', ''))
        user_field(user, 'email', request.data.get('email', ''))
        # user_field(user, 'age', request.data.get('age', ''))
        # user_field(user, 'workclass', request.data.get('workclass', ''))
        # user_field(user, 'education', request.data.get('education', ''))
        # user_field(user, 'marital_status', request.data.get('marital_status', ''))
        # user_field(user, 'occupation', request.data.get('occupation', ''))
        # user_field(user, 'relationship', request.data.get('relationship', ''))
        # user_field(user, 'sex', request.data.get('sex', ''))
        # user_field(user, 'capital_gain', request.data.get('capital_gain', ''))
        # user_field(user, 'capital_loss', request.data.get('capital_loss', ''))
        # user_field(hours_per_week, 'hours_per_week', request.data.get('hours_per_week', ''))
        
        user.save()
        return user