<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Mentor;
use App\Models\MyCourse;
use App\Models\Review;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $course = Course::query();
        $q = $request->query('q');
        $status = $request->query('status');
        $course->when($q, function($query) use ($q) {
            return $query->whereRaw("name LIKE '%".strtolower($q)."%'");
        });
        $course->when($status, function($query) use ($status) {
            return $query->where('status', '=', $status);
        });
        return response()->json([
            'status' => 'success',
            'data' => $course->paginate(10)
        ], 200);
    }

    public function show($id)
    {
        $course = Course::with('chapters.lessons')->with('mentor')->with('images')->find($id);
        if(!$course)
        {
            return response()->json([
                'status'=> 'error',
                'message'=> 'course not found'
            ], 404);
        }
        $reviews = Review::where('course_id','=', $id)->get()->toArray();
        if(count($reviews) > 0){
            $userIds = array_column($reviews, 'user_id');
            $users = getUserByIds($userIds);
            if($users['status'] === 'error')
            {
                $reviews = [];
            }
            else
            {
                foreach ($reviews as $key => $review) {
                    $userIndex = array_search($review['user_id'], array_column($users['data'], 'id'));
                    $reviews[$key]['users'] = $users['data'][$userIndex];
                }
            }
        }
        $dataVideos = Chapter::where('course_id', '=', $id)->withCount('lessons')->get()->toArray();
        $totalVideos = array_sum(array_column($dataVideos, 'lessons_count'));
        $totalStudent = MyCourse::where('course_id', '=', $id)->count();
        $course['reviews'] = $reviews;
        $course['total_student'] = $totalStudent;
        $course['total_videos'] = $totalVideos;
        return response()->json([
            'status' => 'success',
            'data' => $course
        ], 200);
    }


    public function create(Request $request)
    {
        $rules = [
            'name' => 'required|string',
            'certificate' => 'required|boolean',
            'thumbnail' => 'string|url',
            'type' => 'required|in:free,premium',
            'status' => 'required|in:draft,published',
            'price' => 'integer',
            'level' => 'required|in:all-level,beginner,intermediate,advance',
            'mentor_id' => 'required|integer',
            'description' => 'required|string'
        ];
        $data = $request->all();
        $validator = Validator::make($data, $rules);

        if($validator->fails())
        {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $mentorId = $request->input('mentor_id');
        $mentor = Mentor::find($mentorId);
        if(!$mentor)
        {
            return response()->json([
                'status'=> 'error',
                'message'=> 'mentor not found'
            ], 404);
        }
        $course = Course::create($data);
        return response()->json([
            'status' => 'success',
            'data' => $course
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'name' => 'string',
            'certificate' => 'boolean',
            'thumbnail' => 'string|url',
            'type' => 'in:free,premium',
            'status' => 'in:draft,published',
            'price' => 'integer',
            'level' => 'in:all-level,beginner,intermediate,advance',
            'mentor_id' => 'integer',
            'description' => 'string'
        ];
        $data = $request->all();
        $validator = Validator::make($data, $rules);

        if($validator->fails())
        {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $course = Course::find($id);
        if(!$course)
        {
            return response()->json([
                'status'=> 'error',
                'message'=> 'course not found'
            ], 404);
        }

        $mentorId = $request->input('mentor_id');
        if($mentorId)
        {
            $mentor = Mentor::find($mentorId);
            if(!$mentor)
            {
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'mentor not found'
                ], 404);
            }
        }

        $course->fill($data);
        $course->save();
        return response()->json([
            'status' => 'success',
            'data' => $course
        ], 200);
    }

    public function destroy($id)
    {
        $course = Course::find($id);
        if(!$course)
        {
            return response()->json([
                'status'=> 'error',
                'message'=> 'course not found'
            ], 404);
        }
        $course->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'course deleted'
        ]);
    }
}
