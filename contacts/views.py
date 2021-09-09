from rest_framework import status
from contacts.models import Contact
from contacts.serializers import ContactSerializer
from rest_framework import generics

class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

