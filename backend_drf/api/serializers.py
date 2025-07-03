from rest_framework import serializers


class StockPredictionSerilalizer(serializers.Serializer):
  ticker = serializers.CharField(max_length=20)
  