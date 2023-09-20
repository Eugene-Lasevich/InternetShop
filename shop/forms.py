from django import forms
from .models import Review

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['name', 'rating', 'text']

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super(ReviewForm, self).__init__(*args, **kwargs)
        self.fields['name'].initial = user.username  # Инициализируйте поле name именем пользователя
        self.fields['name'].widget = forms.HiddenInput()
