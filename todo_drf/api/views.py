from rest_framework import permissions, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer, CreateUserSerializer, UserSerializer, LoginUserSerializer
from knox.models import  AuthToken


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response ({
            "user" : UserSerializer(user, context=self.get_serializer_context()).data,
            "token" : AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response ({
            "user" : UserSerializer(user, context=self.get_serializer_context()).data,
            "token" : AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List' : '/task-list/',
        'Create' : '/task-create/',
        'Update' : '/task-update/<str:pk>/',
        'Delete' : '/task-delete/<str:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])  
def taskList(request):
    # tasks = Task.objects.all()
    tasks = request.user.tasks.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])  
# def taskDetail(request, pk):
#     task = Task.objects.get(id=pk)
#     serializer = TaskSerializer(task)
#     return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])  
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(owner=request.user)

    return Response(serializer.data)


@api_view(['PUT'])  
@permission_classes([permissions.IsAuthenticated])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save(owner=request.user)

    return Response(serializer.data)


@api_view(['DELETE']) 
@permission_classes([permissions.IsAuthenticated]) 
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Task Deleted')






