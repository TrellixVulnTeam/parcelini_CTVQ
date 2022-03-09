from geolocation.addressing import get_lat_lng_from_address
import requests


def get_parcel_info_ca_1(address):

    coords = get_lat_lng_from_address(address)

    query_args = f"?where=1%3D1&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry={coords['lng']}%2C{coords['lat']}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson"
    api_call_url_all_info = "https://gis.conservation.ca.gov/server/rest/services/CGS_Earthquake_Hazard_Zones/SHP_ZoneInfo/MapServer/0/query"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
    }
    r = requests.get(api_call_url_all_info + query_args, headers=headers)
    print(api_call_url_all_info + query_args)
    data = r.json()
    return data
