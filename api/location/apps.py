from django.apps import AppConfig


class LocationConfig(AppConfig):
    name = 'location'
    
    def ready(self) -> None:
        import location.signals