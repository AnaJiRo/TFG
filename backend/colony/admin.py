from django.contrib import admin
from .models import Zone, Colony

@admin.register(Zone)
class ZoneAdmin(admin.ModelAdmin):
    list_display = ("name", "locality")
    search_fields = ("name", "locality")

@admin.register(Colony)
class ColonyAdmin(admin.ModelAdmin):
    list_display = ("name", "zone", "ubication", "size")
    search_fields = ("name", "zone__name", "ubication")
    list_filter = ("zone",)
